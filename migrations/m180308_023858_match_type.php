<?php

use yii\db\Migration;

/**
 * Class m180308_023858_match_type
 */
class m180308_023858_match_type extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
           $this->createTable('match_type', [
            'id' => $this->primaryKey()->notNULL(),
            'name' => 'varchar(100)',
            'buy_in' => $this->double(),           
            'created_at' => 'datetime',
            'updated_at' =>'timestamp',
            'deleted_at' =>'datetime'
            
        ]);


    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
       $this->dropTable('match_type');
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m180308_023858_match_type cannot be reverted.\n";

        return false;
    }
    */
}
