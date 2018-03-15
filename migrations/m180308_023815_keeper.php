<?php

use yii\db\Migration;

/**
 * Class m180308_023815_keeper
 */
class m180308_023815_keeper extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
           $this->createTable('keeper', [
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
        $this->dropTable('keeper');
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m180308_023815_keeper cannot be reverted.\n";

        return false;
    }
    */
}
