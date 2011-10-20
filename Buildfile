# ==========================================================================
# Project:   Contact
# Copyright: @2011 My Company, Inc.
# ==========================================================================

config :all,
  :required => [
    "sproutcore/core_foundation",
    "sproutcore/foundation",
    "sproutcore/datastore",
    "sproutcore/statechart"
  ],
  :theme => "sproutcore/empty_theme"

proxy "/datas", :to => "localhost:8080"
proxy "/datas/new", :to => "localhost:8080"