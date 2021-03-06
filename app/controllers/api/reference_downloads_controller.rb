class Api::ReferenceDownloadsController < ApplicationController
  def create
    user = current_user || User.find_by(email: 'guest_not_signed_in@unicef.org')
    download = Download.create(author: user)
    reference = ReferenceLink.find_by(id: params[:id])
    reference_download = ReferenceDownload.create(download_id: download.id,
                                                  reference_downloadable_id: reference.id,
                                                  reference_downloadable_type: reference.class.model_name.name)
    reference_download_count = ReferenceDownload.where(reference_downloadable_id: reference.id,
                                                       reference_downloadable_type: reference.class.model_name.name).count
    reference.update(download_count: reference.downloads.count)
    render json: { status: 200, download_count: reference_download_count }
  end
end