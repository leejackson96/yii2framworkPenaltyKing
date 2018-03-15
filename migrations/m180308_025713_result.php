<?php

use yii\db\Migration;

/**
 * Class m180308_025713_result
 */
class m180308_025713_result extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {

         $this->createTable('result', [
            'id' => $this->primaryKey()->notNULL(),
            'winner_id' => $this->integer(),
            'loser_id' => $this->integer(),
            'match_id' => $this->integer(),
            'pot_value' => $this->double(),
            'pot_won' => $this->double(),    
            'created_at' => 'datetime',
            'updated_at' =>'timestamp',
            'deleted_at' =>'datetime'
            
        ]);

        $this->addForeignKey(
         'fk-result-winner_id',
         'result',
         'winner_id',
         'player',
         'id',
         'CASCADE'
        );
        $this->addForeignKey(
         'fk-result-loser_id',
         'result',
         'loser_id',
         'player',
         'id',
         'CASCADE'
        );

        $this->addForeignKey(
         'fk-result-match_id',
         'result',
         'match_id',
         'match',
         'id',
         'CASCADE'
        );



    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('result');
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m180308_025713_result cannot be reverted.\n";

        return false;
    }
    */
}
