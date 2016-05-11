class FilesController < ApplicationController
  def index
    # @dir = params[:path] || User.new.home
    @dir = params[:path] || "/"
    @dir = "/" + @dir unless @dir.start_with?("/")
  end

  def show
  end

  def edit
  end
end
