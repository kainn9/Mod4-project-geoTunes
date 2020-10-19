class AddColumnPlaylistToPlayRoute < ActiveRecord::Migration[6.0]
  def change
    add_column :play_routes, :playlist, :string
  end
end
