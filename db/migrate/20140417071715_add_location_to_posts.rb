class AddLocationToPosts < ActiveRecord::Migration
  def change
    add_column :posts, :location, :string, :limit => 1000
  end
end
