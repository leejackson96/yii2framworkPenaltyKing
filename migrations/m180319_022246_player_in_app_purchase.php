<?php

use yii\db\Migration;

/**
 * Class m180319_022246_player_in_app_purchase
 */
class m180319_022246_player_in_app_purchase extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
          $this->createTable('player_in_app_purchase', [
            'id' => $this->primaryKey()->notNULL(),
            'in_app_purchase_id' => $this->integer(),
            'player_id' => $this->integer(),
            'wallet_id' => $this->integer(),
            'paid_amount' => $this->double(),
            'amount' => $this->double(),
            'created_at' => 'datetime',
            'updated_at' =>'timestamp',
            'deleted_at' =>'datetime'
            
        ]);

        $this->addForeignKey(
         'fk-player_in_app_purchase-in_app_purchase_id',
         'player_in_app_purchase',
         'in_app_purchase_id',
         'in_app_purchase',
         'id',
         'CASCADE'
        );


        $this->addForeignKey(
         'fk-player_in_app_purchase-player_id',
         'player_in_app_purchase',
         'player_id',
         'player',
         'id',
         'CASCADE'
        );


        $this->addForeignKey(
         'fk-player_in_app_purchase-wallet_id',
         'player_in_app_purchase',
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
        $this->dropTable('player_in_app_purchase');
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m180319_022246_player_in_app_purchase cannot be reverted.\n";

        return false;
    }
    */
}
