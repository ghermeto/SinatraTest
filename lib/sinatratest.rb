# To change this template, choose Tools | Templates
# and open the template in the editor.
require 'rubygems'
require 'sinatra/base'
require 'json'

class SinatraTest < Sinatra::Base

  set :root, File.dirname(__FILE__) + '/../'
  set :environment, :development
  set :port, 4455

  configure :development do
    set :file, 'softwares.json'
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

  # fix the ids when a delete happens
  def fix_id array
    array.sort! { |a,b| a['id'] <=> b['id'] }.each_with_index { |e, i| array[i]['id'] = "#{i+1}"  }
    array
  end

end
