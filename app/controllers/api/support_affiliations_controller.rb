class Api::SupportAffiliationsController < ApplicationController
  def index
    support_affiliations = SupportAffiliation.all
    render json: { support_affiliations: support_affiliations, status: 'success' }
  end
end