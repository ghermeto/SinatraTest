# this allow us to run single tests like: rspec spec/app_spec.rb
ENV['RACK_ENV'] = 'test' 

#requires
require 'sinatratest'
require 'rack/test'
require 'nokogiri'

def app
    @app ||= SinatraTest
end
