<?php

use yii\db\Migration;

/**
 * Class m180308_024814_transaction
 */
class m180308_024814_transaction extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {

        $this->createTable('transaction', [
            'id' => $this->primaryKey()->notNULL(),
            'wallet_id' => $this->integer(),
            'player_id' => $this->integer(),
            'type' => 'varchar(100)',
            'amount' => $this->double(),
            'transaction' => 'varchar(100)',
            'before_balance' => $this->double(),
            'after_balance' =>  $this->double(),    
            'created_at' => 'datetime',
            'updated_at' =>'timestamp',
            'deleted_at' =>'datetime'
            
        ]);

        $this->addForeignKey(
         'fk-transaction-player_id',
         'transaction',
         'player_id',
         'player',
         'id',
         'CASCADE'
        );
        $this->addForeignKey(
         'fk-transaction-wallet_id',
         'transaction',
         'wallet_id',
         'wallet',
         'id',
         'CASCADE'
        );

    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('transaction');
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m180308_024814_transaction cannot be reverted.\n";

        return false;
    }
    */
}
