# To change this template, choose Tools | Templates
# and open the template in the editor.
require 'rubygems'
require 'sinatra/base'
require 'json'
require 'couch'

class SinatraTest < Sinatra::Base

  set :root, File.dirname(__FILE__) + '/../'
  set :show_exceptions, false

  CouchError = Class.new(StandardError)

  configure :development do
    set :file, 'softwares.json'
    set :couch_host, 'localhost'
    set :couch_port, 5984
    set :couch_load, 'languages.json'
  end

  mime_type :ejs, 'text/html'

  # if we get an error from couch
  error CouchError do
    content_type :json
    { "message" => env['sinatra.error'].message }.to_json
  end

  #before filter for the /filter route
  before '/filter' do
    #writes on the stdout
    puts "Here we can apply transformations to the request before gets to the routes"
    #test request object
    puts "My user agent: #{request.user_agent}"
  end

  #after filter for the /filter route
  after '/filter' do
    #writes on the stdout
    puts "Here we can transform the response"
  end

  #404
  not_found do
    'Is this a 404 message?'
  end

  #test redirect
  get '/google' do
    redirect 'http://www.google.com'
  end

  #root get
  get '/' do
    redirect '/test_app/test_app.html'
  end

  # gets all elements in the json file
  get '/softwares' do
    content_type :json
    json = JSON.parse File.read(options.file)
    json['list'].to_json
  end

  # gets a specific element in the json file
  get '/softwares/:id' do
    content_type :json
    json = JSON.parse File.read(options.file)
    result = {}
    json['list'].each { |i| result = i if i["id"] == params[:id] }
    result.to_json
  end

  # creates an entry in the json file
  post '/softwares' do
    content_type :json
    json = JSON.parse File.read(options.file)
    json['list'] << params
    File.open(options.file, 'w') do |f|
      f.puts JSON.pretty_generate(json)
    end
    {"success" => true}.to_json
  end

  # updates an entry in the json file
  put '/softwares/:id' do
    content_type :json
    json = JSON.parse File.read(options.file)
    json['list'].map! { |i| (i["id"] == params[:id])? params : i  }
    File.open(options.file, 'w') do |f|
      f.puts JSON.pretty_generate(json)
    end
    {"success" => true}.to_json
  end

  # deletes an entry in the json file
  delete '/softwares/:id' do
    content_type :json
    json = JSON.parse File.read(options.file)
    json['list'].delete_at(json['list'].index { |i| i["id"] == params[:id] })
    json['list'] = fix_id json['list']
    File.open(options.file, 'w') do |f|
      f.puts JSON.pretty_generate(json)
    end
    {"success" => true}.to_json
  end

  # gets all the entries in the couchdb sinatratest/languages
  get '/couchdb' do
    content_type :json
    begin
      couch = couch_conn
      res = couch.get("/sinatratest/languages")
      json = JSON.parse res.body
      json['list'].to_json
    rescue => e
      raise CouchError, e
    end
  end

  # creates the couchdb database
  post '/couchdb' do
    content_type :json
    couch = couch_conn
    # creates the database on couch
    couch.put("/sinatratest", "")
    #creates a languages document and load with the json file content
    couch.put("/sinatratest/languages", File.read(options.couch_load))
    {"success" => true}.to_json
  end

  # fix the ids when a delete happens
  def fix_id array
    array.sort! { |a,b| a['id'] <=> b['id'] }.each_with_index { |e, i| array[i]['id'] = "#{i+1}"  }
    array
  end

  # connects to couchdb
  # should be changed to a proper gem
  def couch_conn
    couch = Couch::Server.new(options.couch_host, options.couch_port)
    couch
  end

end
