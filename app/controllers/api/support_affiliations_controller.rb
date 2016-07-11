class Api::SupportAffiliationsController < ApplicationController
  def index
    support_affiliations = SupportAffiliation.all
    render json: { support_affiliations: support_affiliations, status: 200 }
  end
end