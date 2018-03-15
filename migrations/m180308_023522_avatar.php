<?php

use yii\db\Migration;

/**
 * Class m180308_023522_avatar
 */
class m180308_023522_avatar extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
          $this->createTable('avatar', [
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
         $this->dropTable('avatar');
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m180308_023522_avatar cannot be reverted.\n";

        return false;
    }
    */
}
