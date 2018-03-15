<?php

use yii\db\Migration;

/**
 * Class m180308_024155_statistics
 */
class m180308_024155_statistics extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
           $this->createTable('statistics', [
            'id' => $this->primaryKey()->notNULL(),
            'player_id' => $this->integer(),
            'total_match' => $this->integer(),
            'total_blocks' => $this->integer(),
            'total_goals' =>  $this->integer(),
            'total_win' =>  $this->integer(),           
            'created_at' => 'datetime',
            'updated_at' =>'timestamp',
            'deleted_at' =>'datetime'
            
        ]);

        $this->addForeignKey(
         'fk-statistics-player_id',
         'statistics',
         'player_id',
         'player',
         'id',
         'CASCADE'
        );


    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('statistics');
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m180308_024155_statistics cannot be reverted.\n";

        return false;
    }
    */
}
