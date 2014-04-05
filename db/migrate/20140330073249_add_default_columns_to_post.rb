class AddDefaultColumnsToPost < ActiveRecord::Migration
  def change
    add_column :posts, :post_content, :text
    add_column :posts, :user_id, :integer
  end
end
