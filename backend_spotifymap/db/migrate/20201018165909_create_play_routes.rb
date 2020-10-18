class CreatePlayRoutes < ActiveRecord::Migration[6.0]
  def change
    create_table :play_routes do |t|
      t.integer :user_id
      t.string :name
      t.string :dateCreated
      t.timestamps
    end
  end
end
