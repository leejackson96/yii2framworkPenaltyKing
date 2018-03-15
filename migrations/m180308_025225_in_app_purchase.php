<?php

use yii\db\Migration;

/**
 * Class m180308_025225_in_app_purchase
 */
class m180308_025225_in_app_purchase extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('in_app_purchase', [
            'id' => $this->primaryKey()->notNULL(),
            'wallet_id' => $this->integer(),
            'player_id' => $this->integer(),
            'paid_amount' => $this->double(),
            'amount' => $this->double(),
            'created_at' => 'datetime',
            'updated_at' =>'timestamp',
            'deleted_at' =>'datetime'
            
        ]);

        $this->addForeignKey(
         'fk-in_app_purchase-player_id',
         'in_app_purchase',
         'player_id',
         'player',
         'id',
         'CASCADE'
        );
        $this->addForeignKey(
         'fk-in_app_purchasein_app_purchase-wallet_id',
         'in_app_purchase',
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
       $this->dropTable('in_app_purchase');
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m180308_025225_in_app_purchase cannot be reverted.\n";

        return false;
    }
    */
}
