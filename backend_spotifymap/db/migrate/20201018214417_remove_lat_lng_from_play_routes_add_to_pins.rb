class RemoveLatLngFromPlayRoutesAddToPins < ActiveRecord::Migration[6.0]
  def change
    remove_column :play_routes, :lat, :float
    remove_column :play_routes, :lng, :float
    add_column :pins, :lat, :float
    add_column :pins, :lng, :float
  end
end
