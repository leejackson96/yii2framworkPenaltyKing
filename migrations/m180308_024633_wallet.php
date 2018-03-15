<?php

use yii\db\Migration;

/**
 * Class m180308_024633_wallet
 */
class m180308_024633_wallet extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {

          $this->createTable('wallet', [
            'id' => $this->primaryKey()->notNULL(),
            'player_id' => $this->integer(),
            'type' =>'varchar(100)',
            'balance' => $this->double(), 
            'created_at' => 'datetime',
            'updated_at' =>'timestamp',
            'deleted_at' =>'datetime'
            
        ]);

        $this->addForeignKey(
         'fk-wallet-player_id',
         'wallet',
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
        $this->dropTable('wallet');
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m180308_024633_wallet cannot be reverted.\n";

        return false;
    }
    */
}
