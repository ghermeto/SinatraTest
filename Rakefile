require 'rubygems'
require 'rake'
require 'rspec/core/rake_task'

desc "Run all the specs"
RSpec::Core::RakeTask.new do |t|
    t.pattern = ENV['spec'] || 'spec/**/*_spec.rb'
    t.rspec_opts = ["--color"]
end
