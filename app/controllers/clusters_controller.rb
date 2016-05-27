class ClustersController < ApplicationController
  def index
    @ganglia = Ganglia.new
    @showqoakley = Showqer.new 'oakley'
    @showqruby = Showqer.new 'ruby'
  end

  def show
    if params[:id] == "oakley"
      @ganglia = Ganglia.new.oakley
    elsif params[:id] == "ruby"
      @ganglia = Ganglia.new.ruby
    else
      raise ActionController::RoutingError.new('Cluster Not Found')
    end
  end
end
