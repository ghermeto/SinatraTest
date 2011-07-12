$: << File.expand_path(File.dirname(__FILE__))
$: << File.expand_path(File.dirname(__FILE__) + "/lib")

require 'sinatratest'

SinatraTest.run!
