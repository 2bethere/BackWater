class AddTestResultsToPost < ActiveRecord::Migration
  def change
    add_column :posts, :test_result_arsenic, :integer,  default: 0
    add_column :posts, :test_result_cholera_o1, :integer , default: 0
    add_column :posts, :test_result_cholera_o139, :integer , default: 0
    add_column :posts, :test_result_coliform, :integer , default: 0
    add_column :posts, :test_result_nitrite, :integer , default: 0
  end
end
