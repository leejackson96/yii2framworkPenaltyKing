<?php

use yii\db\Migration;

/**
 * Class m180312_030651_achievement
 */
class m180312_030651_achievement extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
         $this->createTable('achievement', [
            'id' => $this->primaryKey()->notNULL(),
            'name' => 'varchar(100)',
            'description' => 'varchar(250)',
            'total_exp' => $this->double(),
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
           $this->dropTable('achievement');
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m180312_030651_achievement cannot be reverted.\n";

        return false;
    }
    */
}
