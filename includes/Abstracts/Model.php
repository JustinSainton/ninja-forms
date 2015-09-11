<?php if ( ! defined( 'ABSPATH' ) ) exit;

class NF_Abstracts_Model
{
    /**
     * @var string
     */
    protected $_db = '';

    /**
     * @var int
     */
    protected $_id = '';

    /**
     * @var string
     */
    protected $_parent_id = '';

    /**
     * @var string
     */
    protected $_table_name = '';

    /**
     * @var string
     */
    protected $_meta_table_name = '';

    /**
     * @var string
     */
    protected $_relationships_table = 'nf_relationships';

    /**
     * @var array
     */
    protected $_columns = array();

    /**
     * @var array
     */
    protected $_settings = array();

    /**
     * @var array
     */
    protected $_results = array();

    /**
     * @var bool
     */
    protected $_cache = TRUE;

    /**
     * Constructor
     *
     * @param $id
     */
    public function __construct( $db, $id = '', $parent_id = '' )
    {
        $this->_db = $db;

        $this->_id = $id;

        $this->_parent_id = $parent_id;

        $this->_table_name          = $this->_db->prefix . $this->_table_name;
        $this->_meta_table_name     = $this->_db->prefix . $this->_meta_table_name;
        $this->_relationships_table = $this->_db->prefix . $this->_relationships_table;

        $this->_settings = $this->get_settings();

    }

    /*
     * PUBLIC METHODS
     */

    public function get_id()
    {
        return $this->_id;
    }

    /**
     * Get Settings
     *
     * @param string ...$only returns a subset of the object's settings
     * @return array
     */
    public function get_settings()
    {
        if( ! $this->_id ) return;

        if( ! $this->_settings || ! $this->_cache ) {

            $columns = '`' . implode( '`, `', $this->_columns ) . '`';

            $results = $this->_db->get_row(
                "
                SELECT $columns
                FROM   `$this->_table_name`
                WHERE `id` = $this->_id
                "
            );

            foreach( $this->_columns as $column ){
                $this->_settings[ $column ] = $results->$column;
            }

            $meta_results = $this->_db->get_results(
                "
                SELECT `key`, `value`
                FROM   `$this->_meta_table_name`
                WHERE  `parent_id` = $this->_id
                "
            );

            foreach ($meta_results as $meta) {
                $this->_settings[ $meta->key ] = $meta->value;
            }
        }

        $only = func_get_args();
        if ( $only && is_array($only)
            // And if the array is NOT multidimensional
            && (count($only) == count($only, COUNT_RECURSIVE))) {

            // If only one setting, return a single value
            if( 1 == count( $only ) ){ return $this->_settings[ $only[0] ]; }

            // Flip the array to match the settings property
            $only_settings = array_flip( $only );

            // Return only the requested settings
            return array_intersect_key( $this->_settings, $only_settings );
        }

        // Return all settings
        return $this->_settings;
    }

    /**
     * Update Setting
     *
     * @param $key
     * @param $value
     * @return bool|false|int
     */
    public function update_setting( $key, $value )
    {
        $this->_settings[ $key ] = $value;

        return $this;
    }

    /**
     * Update Settings
     *
     * @param $data
     * @return bool
     */
    public function update_settings( $data )
    {
        foreach( $data as $key => $value ){
            $this->update_setting( $key, $value );
        }

        return $this;
    }

    /**
     * Delete
     *
     * @return bool
     */
    public function delete()
    {
        $results = array();

        $results[] = $this->_db->delete(
            $this->_table_name,
            array(
                'id' => $this->_id
            )
        );

        $results[] = $this->_db->delete(
            $this->_meta_table_name,
            array(
                'parent_id' => $this->_id
            )
        );

        // TODO: Cascade through Object Relationships

        return in_array( FALSE, $results );
    }

    /**
     * Find
     *
     * @param string $where
     * @return array|bool
     */
    public function find( $parent_id, $where = '' )
    {
        $query = $this->build_meta_query( $parent_id, $where );

        $ids = $this->_db->get_col( $query );

        $class = get_class( $this );

        $results = array();
        foreach( $ids as $id ){
            $results[] = $object = new $class( $this->_db, $id, $parent_id );
        }

        return $results;
    }

    /*
     * UTILITY METHODS
     */

    /**
     * Save
     */
    public function save()
    {
        if( ! $this->_id ){

            $data = array( 'created_at' => time() );

            if( $this->_parent_id ){
                $data['parent_id'] = $this->_parent_id;
            }

            $result = $this->_db->insert(
                $this->_table_name,
                $data
            );

            $this->_id = $this->_db->insert_id;

            echo "<pre>";
            var_dump( "Created field id# " . $this->_id );
            echo "</pre>";

        }

        $this->_save_settings();
    }

    /**
     * Cache Flag
     * 
     * @param string $cache
     * @return $this
     */
    public function cache( $cache = '' )
    {
        if( $cache !== '' ) {
            $this->_cache = $cache;
        }

        return $this;
    }

    /*
     * PROTECTED METHODS
     */

    /**
     * Save Setting
     *
     * @param $key
     * @param $value
     * @return bool|false|int
     */
    protected function _save_setting( $key, $value )
    {
        if( in_array( $key, $this->_columns ) ){

            return $this->_db->update(
                $this->_table_name,
                array(
                    $key => $value
                ),
                array(
                    'id' => $this->_id
                )
            );
        }

        $result = $this->_db->update(
            $this->_meta_table_name,
            array(
                'value' => $value
            ),
            array(
                'parent_id' => $this->_id,
                'key' => $key
            )
        );

        if( 0 === $result ){
            // Nothing to Update. Row needs to be created.
            $result = $this->_db->insert(
                $this->_meta_table_name,
                array(
                    'key' => $key,
                    'value' => $value,
                    'parent_id' => $this->_id,
                )
            );
        }
    }

    /**
     * Save Settings
     *
     * @return bool
     */
    protected function _save_settings()
    {
        if( ! $this->_settings ) return;

        foreach( $this->_settings as $key => $value ){
            $this->_results[] = $this->_save_setting( $key, $value );
        }

        return $this->_results;
    }

    protected function build_meta_query( $parent_id, $where )
    {
        $join_statement = array();
        $where_statement = array();

        if( $where AND is_array( $where ) ) {

            $where_conditions = array();
            foreach ($where as $key => $value) {
                $conditions['key'] = $key;
                $conditions['value'] = $value;

                $where_conditions[] = $conditions;
            }

            $count = count($where);
            for ($i = 0; $i < $count; $i++) {

                $join_statement[] = "INNER JOIN " . $this->_meta_table_name . " as meta$i on meta$i.parent_id = " . $this->_table_name . ".id";
                $where_statement[] = "( meta$i.key = '" . $where_conditions[$i]['key'] . "' AND meta$i.value = '" . $where_conditions[$i]['value'] . "' )";
            }

        }

        $join_statement = implode( ' ', $join_statement );

        $where_statement = implode( ' AND ', $where_statement );
        if( $where_statement ) $where_statement = "AND " . $where_statement;

        return "SELECT DISTINCT $this->_table_name.id FROM $this->_table_name $join_statement WHERE $this->_table_name.parent_id = $parent_id $where_statement";

    }


}
