<?php

use yii\db\Migration;

/**
 * Class m180308_070948_favorite
 */
class m180308_070948_favorite extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('favorite', [
            'id' => $this->primaryKey()->notNULL(),
            'player_id' => $this->integer(),
            'friend_id' => $this->integer(),
            'created_at' => 'datetime',
            'updated_at' =>'timestamp',
            'deleted_at' =>'datetime'
            
        ]);

        $this->addForeignKey(
         'fk-favorite-player_id',
         'favorite',
         'player_id',
         'player',
         'id',
         'CASCADE'
        );
        
        $this->addForeignKey(
         'fk-favorite-friend_id',
         'favorite',
         'friend_id',
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
        $this->dropTable('favorite');
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m180308_070948_favorite cannot be reverted.\n";

        return false;
    }
    */
}
