require 'spec_helper'

describe SinatraTest do
    include Rack::Test::Methods
    
    it "should return 42" do
        get '/mu-280f6174-a96259a3-fe938e39-954be80a'
        last_response.status.should == 200
        last_response.body.should == "42"
    end
    
end