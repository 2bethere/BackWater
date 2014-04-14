class ApplicationController < ActionController::Base

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  # This is our new function that comes before Devise's one
  #before_filter :authenticate_user_from_token!
  # This is Devise's authentication
  #before_filter :authenticate_user!

  after_filter :set_csrf_header, only: [:new, :create]

  protected


  def set_csrf_header
    response.headers['X-CSRF-Token'] = form_authenticity_token
  end

  def after_sign_in_path_for(resource)
    sign_in_url = url_for(:action => 'new', :controller => 'sessions', :only_path => false, :protocol => 'http')
    if request.referer == sign_in_url
      super
    else
      stored_location_for(resource) ||
          if resource.is_a?(User) && params[:json_signin].presence
            '/users.json'
          else
            stored_location_for(resource) || request.referer || root_path
          end
    end
  end


  private

  # For this example, we are simply using token authentication
  # via parameters. However, anyone could use Rails's token
  # authentication features to get the token from a header.
  def authenticate_user_from_token!
    user_token = params[:user_token].presence
    user       = user_token && User.find_by_authentication_token(user_token.to_s)

    if user
      # Notice we are passing store false, so the user is not
      # actually stored in the session and a token is needed
      # for every request. If you want the token to work as a
      # sign in token, you can simply remove store: false.
      sign_in user, store: false
    end
  end



end


