# -*- encoding: utf-8 -*-
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'fileutils'
require 'bootstrap-combobox/version'

%w{vendor vendor/assets vendor/assets/javascripts vendor/assets/stylesheets }.each do |path|
  file = File.join(path.split('/'))
  Dir.mkdir(file) unless Dir.exist?(file)
end

[[File.join(%w{css bootstrap-combobox.css}), File.join(%w{vendor assets stylesheets bootstrap-combobox.css})],
  [File.join(%w{js bootstrap-combobox.js}), File.join(%w{vendor assets javascripts bootstrap-combobox.js})]].each do |pair|
  FileUtils.cp(pair[0], pair[1]) unless File.exist? pair[1]
end 

Gem::Specification.new do |gem|
  gem.name          = "bootstrap-combobox"
  gem.version       = Bootstrap::Combobox::VERSION
  gem.authors       = %w{ danielfarrell denishaskin }
  gem.email         = %w{ danielfarrell76@gmail.com denis@constantorbit.com }
  gem.description   = %q{Combobox for Bootstrap, based on Bootstrap typeahead}
  gem.summary       = %q{Combobox for Bootstrap, based on Bootstrap typeahead}
  gem.homepage      = "https://github.com/danielfarrell/bootstrap-combobox"
  gem.license       = 'MIT'

  gem.files         = Dir["{lib,vendor}/**/*"] + ["README.md"]
  gem.executables   = gem.files.grep(%r{^bin/}).map{ |f| File.basename(f) }
  gem.test_files    = gem.files.grep(%r{^(test|spec|features)/})
  gem.require_paths = ["lib"]
end
