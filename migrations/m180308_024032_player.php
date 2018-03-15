<?php

use yii\db\Migration;

/**
 * Class m180308_024032_player
 */
class m180308_024032_player extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
           $this->createTable('player', [
            'id' => $this->primaryKey()->notNULL(),
            'avatar_id' => $this->integer(),
            'username' => 'varchar(100)',
            'password' => 'varchar(200)',
            'facebook_id' => 'varchar(100)',
            'status' => 'varchar(100)',
            'country' => 'varchar(100)',
            'ip_address' => 'varchar(100)',
            'access_token' => "varchar(100)", 
            'is_bot' => 'tinyint(1)',
            'is_guest' => 'tinyint(1)', 
            'last_login_at' => 'datetime',            
            'created_at' => 'datetime',
            'updated_at' =>'timestamp',
            'deleted_at' =>'datetime'
            
        ]);

           $this->addForeignKey(
            'fk-player-avatar_id',
            'player',
            'avatar_id',
            'avatar',
            'id',
            'CASCADE'
           );


    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('player');
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m180308_024032_player cannot be reverted.\n";

        return false;
    }
    */
}
