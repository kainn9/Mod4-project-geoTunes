class CreateFavRoutes < ActiveRecord::Migration[6.0]
  def change
    create_table :fav_routes do |t|
      t.integer :user_id
      t.integer :play_route_id
      t.timestamps
    end
  end
end
