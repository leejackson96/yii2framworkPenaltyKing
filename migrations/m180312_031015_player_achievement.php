<?php

use yii\db\Migration;

/**
 * Class m180312_031015_player_achievement
 */
class m180312_031015_player_achievement extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
         $this->createTable('player_achievement', [
            'id' => $this->primaryKey()->notNULL(),
            'player_id' => $this->integer(),
            'achievement_id' => $this->integer(),
            'current_exp' => $this->double(),
            'status' => 'tinyint(1)',
            'created_at' => 'datetime',
            'updated_at' =>'timestamp',
            'deleted_at' =>'datetime'
            
        ]);

        $this->addForeignKey(
         'fk-player_achievement-player_id',
         'player_achievement',
         'player_id',
         'player',
         'id',
         'CASCADE'
        );

        $this->addForeignKey(
         'fk-player_achievement-achievement_id',
         'player_achievement',
         'achievement_id',
         'achievement',
         'id',
         'CASCADE'
        );

    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('player_achievement');
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m180312_031015_player_achievement cannot be reverted.\n";

        return false;
    }
    */
}
