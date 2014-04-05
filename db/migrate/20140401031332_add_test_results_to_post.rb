class AddTestResultsToPost < ActiveRecord::Migration
  def change
    add_column :posts, :test_result_arsenic, :integer
    add_column :posts, :test_result_cholera, :integer
    add_column :posts, :test_result_coliform, :integer
    add_column :posts, :test_result_nitrite, :integer
  end
end
