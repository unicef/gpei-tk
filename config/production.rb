Rails.application.configure do
  config.assets.precompile += %w(
    *.svg *.eot *.woff *.ttf *.png *.jpg *.jpeg *.gif
  )
end