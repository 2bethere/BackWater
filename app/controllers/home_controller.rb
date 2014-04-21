class HomeController < ApplicationController

  def index
    @users = User.all
  end

  def list
    @highid = post_params
  end

  def post_params
    params.require(:id)
  end

end
