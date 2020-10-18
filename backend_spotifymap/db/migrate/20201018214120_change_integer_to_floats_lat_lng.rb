class ChangeIntegerToFloatsLatLng < ActiveRecord::Migration[6.0]
  def change
    remove_column :pins, :lat
    remove_column :pins, :lng
    add_column :play_routes, :lat, :float
    add_column :play_routes, :lng, :float
  end
end
