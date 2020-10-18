class CreatePins < ActiveRecord::Migration[6.0]
  def change
    create_table :pins do |t|
      t.integer :lat
      t.integer :lng
      t.integer :play_route_id
      t.timestamps
    end
  end
end
