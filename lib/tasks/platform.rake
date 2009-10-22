require 'rake/testtask'

namespace :radiant do
  namespace :platform do
    
    desc "Run all extension migrations in a sequence that respects their dependencies"
    task :migrate => :environment do
      require 'radiant/extension_migrator'
      %w{made_easy reader forum taggable paperclipped}.each do |t| 
        task = "radiant:extensions:#{t}:migrate"
        Rake::Task[task].invoke
      end
      Radiant::ExtensionMigrator.migrate_extensions
    end
    
    desc "Update assets for all platform extensions"
    task :update => :environment do
      Rake::Task["radiant:extensions:update_all"].invoke
    end

    desc "Bootstrap a working platform (on top of an empty radiant database)"
    task :bootstrap => :environment do

      #...
      
    end

  end
end

# Load any custom rakefiles from extensions
[RAILS_ROOT, RADIANT_ROOT].uniq.each do |root|
  Dir[root + '/vendor/extensions/*/lib/tasks/*.rake'].sort.each { |ext| load ext }
end