class TermsOfServiceController < ApplicationController
  TERMS_OF_SERVICE = "
    <div class=\"terms_of_service_content\">
      <div>
        Use of this Web site, <a href=\"http://www.Rhizome by GPEI.us/\" target=\"_blank\">www.Rhizome by GPEI.us</a> and all pages in this domain (together, the \"Rhizome by GPEI\"), constitutes acceptance of the following terms and conditions. The developers of this website reserve the right to seek all remedies available by law for any violation of these terms of use.
      </div>

      <div><br></div>

      <div>
        The Rhizome by GPEI Web Site
      </div>
      <div>
        This website is provided for personal use and educational purposes only. Any other use, including reproduction or translation of anything more than a de minimis portion of the Content, or any use other than for personal or educational purposes, requires the express prior written permission. Requests for permission should be sent to us using the copyright permission option on our feedback form, specifying full details of the proposed use. All Content herein is protected by law including, as applicable, copyright laws.
      </div>

      <div><br></div>

      <div>
        The developers of this website reserve the right at any time to change or discontinue any aspect or feature of the Rhizome by GPEI Web Site, including but not limited to these<span class=\"il\">terms</span>of use.
      </div>

      <div><br></div>

      <div>
        The use of particular designations of countries or territories does not imply any judgment by the developers as to the legal status of such countries or territories, of their authorities and institutions or of the delimitation of their boundaries. The mention of names of specific companies or products (whether or not indicated as registered) does not imply any intention to infringe proprietary rights, nor should it be construed as an endorsement or recommendation on the part of the developers.
      </div>

      <div><br></div>

      <div>Limitations of Liability</div>

      <div><br></div>

      <div>
        The United Nations and UNICEF disclaim any liability or responsibility arising from the use of the Rhizome by GPEI Web Site or the Content of the Rhizome by GPEI Web Site. The United Nations, UNICEF, members of their staff, and their contractors, shall not be liable for any financial or other consequences whatsoever arising from the use of the Content of the Rhizome by GPEI Web Site, including the inappropriate, improper, or fraudulent use of such Content. No representations or warranties of any kind concerning the Rhizome by GPEI Web Site are given, including responsibility for any infection by virus or any other contamination or by anything which has destructive properties.
      </div>

      <div><br></div>

      <div>
        Links to Other Web Sites
      </div>

      <div>
        The Rhizome by GPEI Web Site may be linked to other web sites that are not under the developer or UNICEF's control. The developers provide these links merely as a convenience and the inclusion of such links does not imply an endorsement or approval by the developers or UNICEF of any web site, product or service. The developers do not assume any responsibility or liability in respect of such web sites, including, for example, responsibility or liability for the accuracy or reliability of any information, data, opinions, advice or statements made on those web sites.
      </div>

      <div><br></div>

      <div>
        Interactive Features of the Rhizome by GPEI Web Site
      </div>

      <div>
        The Rhizome by GPEI Web Site may contain bulletin boards, chat rooms, answers, access to mailing lists or other message or communication facilities. The user agrees, when taking advantage of such facilities, not to do any of the following: (a) defame, abuse, harass, stalk, threaten or otherwise violate the legal, moral, or human rights of others (such as rights of privacy and publicity); (b) publish, post, distribute or disseminate any defamatory, infringing, obscene, indecent or unlawful material or information; (c) upload or attach files that contain software or other material protected by intellectual property laws (or by rights of privacy) unless the user owns or controls the rights thereto or has received all necessary consents; (d) upload or attach files that contain viruses, corrupted files, or any other similar software or programmes that may damage the operation of another's computer; (e) delete any author attributions, legal notices or proprietary designations or labels in any file that is uploaded; (f) falsify the origin or source of software or other material contained in a file that is uploaded; (g) advertise or offer to sell any goods or services, or conduct or forward surveys, contests, or chain letters; or (h) download any file posted by another user that the user knows, or reasonably should know, cannot be legally distributed in such manner. The developers and UNICEF reserve the absolute right to delete any material posted to the Rhizome by GPEI Web Site without notice to the user.
      </div>

      <div><br></div>

      <div>
        The developers and UNICEF accept no responsibility or liability in respect of the conduct of any user in connection with such facilities, or for any material or answers submitted by users and carried on the Rhizome by GPEI Web Site including, for example, responsibility or liability for the accuracy or reliability of any information, data, opinions, advice or statements made in such material.
      </div>

      <div><br></div>

      <div>
        If you have any questions about this please contact us using the feedback form. Thank you.
      </div>
    </div>
    "
  private_constant :TERMS_OF_SERVICE

  def index
    @terms_of_service = TERMS_OF_SERVICE
  end
end
