class CreateHowToInstructions < ActiveRecord::Migration[4.2]
  def change
    create_table :how_to_instructions do |t|
      t.string :content, null: false
      t.timestamps null: false
    end
  end
end
