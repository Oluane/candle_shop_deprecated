import "./EngagementSection.scss";

import { FormattedMessage } from "react-intl";
import IconSvg from "../IconSvg/IconSvg";
import React from "react";

const EngagementSection = () => {
	return (
		<section className="engagementSection alignCenter">
			<div className="engagementSectionItem">
				<p className="largeText">
					<FormattedMessage id="engagementSection.item.title.1" />
				</p>
				<div className="engagementIcon">
					<IconSvg iconName="creditCard" />
				</div>
				<p className="mediumText alignJustify engagementText">
					<FormattedMessage id="engagementSection.item.text.1" />
				</p>
			</div>
			<div className="engagementSectionItem">
				<p className="largeText">
					<FormattedMessage id="engagementSection.item.title.2" />
				</p>
				<div className="engagementIcon">
					<IconSvg iconName="deliveryMap" />
				</div>
				<p className="mediumText alignJustify engagementText">
					<FormattedMessage id="engagementSection.item.text.2" />
				</p>
			</div>
			<div className="engagementSectionItem">
				<p className="largeText">
					<FormattedMessage id="engagementSection.item.title.3" />
				</p>
				<div className="engagementIcon">
					<IconSvg iconName="parcelIssue" />
				</div>
				<p className="mediumText alignJustify engagementText">
					<FormattedMessage id="engagementSection.item.text.3" />
				</p>
			</div>
			<div className="engagementSectionItem">
				<p className="largeText">
					<FormattedMessage id="engagementSection.item.title.4" />
				</p>
				<div className="engagementIcon">
					<IconSvg iconName="loyaltyGift" />
				</div>
				<p className="mediumText alignJustify engagementText">
					<FormattedMessage id="engagementSection.item.text.4" />
				</p>
			</div>
		</section>
	);
};

export default EngagementSection;
