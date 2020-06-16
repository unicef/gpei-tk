class DownloadsController < ApplicationController
  def reference_links
    @reference_links = ReferenceLink.includes(:tags, :file_type).all
    respond_to do |format|
      format.html
      format.csv { send_data @reference_links.to_csv, filename: "reference_links-#{Date.today}.csv" }
    end
  end
end