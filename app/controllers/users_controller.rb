class UsersController < ApplicationController

  # This is our new function that comes before Devise's one
  before_filter :authenticate_user_from_token!
  # This is Devise's authentication
  before_filter :authenticate_user!

  def index
    @user = current_user
    respond_to do |format|
      format.html # index.html.erb
      format.json  { render :json => @user }
    end
  end

  def show
    response.headers['X-CSRF-Token'] = form_authenticity_token
    @user = User.find(params[:id])
    respond_to do |format|
      format.html # index.html.erb
      format.json  { render :json => @user }
    end
  end

  def gettoken
    @user = current_user
    format.json { render :json => @user }
  end

end
