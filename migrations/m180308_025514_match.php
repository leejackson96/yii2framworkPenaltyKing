<?php

use yii\db\Migration;

/**
 * Class m180308_025514_match
 */
class m180308_025514_match extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
         $this->createTable('match', [
            'id' => $this->primaryKey()->notNULL(),
            'match_type_id' => $this->integer(),
            'status' => 'varchar(100)',
            'created_at' => 'datetime',
            'updated_at' =>'timestamp',
            'deleted_at' =>'datetime'
            
        ]);

        $this->addForeignKey(
         'fk-match-match_type_id',
         'match',
         'match_type_id',
         'match_type',
         'id',
         'CASCADE'
        );

    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('match');
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m180308_025514_match cannot be reverted.\n";

        return false;
    }
    */
}
