<?php

use yii\db\Migration;

/**
 * Class m180319_022215_in_app_purchase
 */
class m180319_022215_in_app_purchase extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
         $this->createTable('in_app_purchase', [
            'id' => $this->primaryKey()->notNULL(),
            'price' => $this->double(),
            'type' => 'varchar(100)',
            'amount' => $this->double(),
            'is_promo' => 'tinyint(1)',
            'created_at' => 'datetime',
            'updated_at' =>'timestamp',
            'deleted_at' =>'datetime'
            
        ]);

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
        echo "m180319_022215_in_app_purchase cannot be reverted.\n";

        return false;
    }
    */
}
