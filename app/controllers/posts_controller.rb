class PostsController < ApplicationController
  layout "posts"
  before_action :set_post, only: [:show, :edit, :update, :destroy, :list]

  # This is our new function that comes before Devise's one
  before_filter :authenticate_user_from_token!, except: [:show, :index]
  # This is Devise's authentication
  before_filter :authenticate_user!, except: [:show, :index]


  # GET /posts
  # GET /posts.json
  def index
    @posts = Post.all.limit(10)
  end

  def list
    highid = @post.id
    @posts = Post.where('id <='+ highid.to_s).limit(10)
  end

  def my
    @posts = Post.where(user: current_user)
  end


  # GET /posts/1
  # GET /posts/1.json
  def show
  end

  # GET /posts/new
  def new
    @post = Post.new
    @post.user = current_user
    @post.images.build
  end

  # GET /posts/1/edit
  def edit
    @post.images.build
  end

  # POST /posts
  # POST /posts.json
  def create
    # Save all images
    @post = Post.new
    @post.post_content = post_params[:post_content]
    @post.test_result_arsenic = post_params[:test_result_arsenic]
    @post.test_result_cholera_o1 = post_params[:test_result_cholera_o1]
    @post.test_result_cholera_o139 = post_params[:test_result_cholera_o139]
    @post.test_result_coliform = post_params[:test_result_coliform]
    @post.test_result_nitrite = post_params[:test_result_nitrite]
    #
    @post.location = post_params[:location]
    @post.user = current_user
    respond_to do |format|
      if @post.save
        if(post_params[:images_attributes])
          post_params[:images_attributes]["0"]["file"].each do |i|
            image = Image.new
            image.file = i
            image.post = @post
            image.save()
          end
        end

        format.html { redirect_to root_path, notice: 'Post was successfully created.' }
        format.json { render action: 'show', status: :created, location: @post }
      else
        format.html { render action: 'new' }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end

  end

  # PATCH/PUT /posts/1
  # PATCH/PUT /posts/1.json
  def update
    respond_to do |format|
      if @post.update(post_params)
        format.html { redirect_to @post, notice: 'Post was successfully updated.' }
        format.json { render action: 'show', status: :ok, location: @post }
      else
        format.html { render action: 'edit' }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /posts/1
  # DELETE /posts/1.json
  def destroy
    @post.destroy
    respond_to do |format|
      format.html { redirect_to posts_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def post_params
      params.require(:post).permit(:post_content, :test_result_cholera_o1, :test_result_cholera_o139,
                                   :test_result_nitrite, :test_result_coliform, :test_result_arsenic,
                                   :location,
                                   images_attributes: [:file => []] )
    end
end
