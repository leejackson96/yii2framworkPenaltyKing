<?php

use yii\db\Migration;

/**
 * Class m180308_030111_player_match
 */
class m180308_030111_player_match extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {

          $this->createTable('player_match', [
            'id' => $this->primaryKey()->notNULL(),
            'match_id' => $this->integer(),
            'player_id' => $this->integer(),
            'opponent_id' => $this->integer(),
            'striker_id' => $this->integer(),
            'keeper_id' => $this->integer(),
            'score' => 'varchar(250)',
            'result' => 'varchar(100)',
            'status' => 'varchar(100)',
            'start_time' => 'datetime',
            'end_time' => 'datetime',
            'amount' => $this->double(),
            'created_at' => 'datetime',
            'updated_at' =>'timestamp',
            'deleted_at' =>'datetime'
            
        ]);

        $this->addForeignKey(
         'fk-player_match-match_id',
         'player_match',
         'match_id',
         'match',
         'id',
         'CASCADE'
        );
        $this->addForeignKey(
         'fk-player_match-player_id',
         'player_match',
         'player_id',
         'player',
         'id',
         'CASCADE'
        );

        $this->addForeignKey(
         'fk-player_match-opponent_id',
         'player_match',
         'opponent_id',
         'player',
         'id',
         'CASCADE'
        );

        $this->addForeignKey(
         'fk-player_match-striker_id',
         'player_match',
         'striker_id',
         'striker',
         'id',
         'CASCADE'
        );

        $this->addForeignKey(
         'fk-player_match-keeper_id',
         'player_match',
         'keeper_id',
         'keeper',
         'id',
         'CASCADE'
        );

    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
       $this->dropTable('player_match');
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m180308_030111_player_match cannot be reverted.\n";

        return false;
    }
    */
}
