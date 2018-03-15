<?php

use yii\db\Migration;

/**
 * Class m180308_023653_striker
 */
class m180308_023653_striker extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {

           $this->createTable('striker', [
            'id' => $this->primaryKey()->notNULL(),
            'name' => 'varchar(100)',  
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
        $this->dropTable('striker');
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m180308_023653_striker cannot be reverted.\n";

        return false;
    }
    */
}
