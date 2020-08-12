import React from "react";
import "./EngagementSection.scss";
import IconSvg from "../IconSvg/IconSvg";

const EngagementSection = () => {
	return (
		<section className="engagementSection alignCenter">
			<div className="engagementSectionItem">
				<p className="largeText">Secured payment</p>
				<p className="mediumText alignJustify engagementText">
					Jelly topping marshmallow gummi bears topping cake wafer. Dough coffee sugar
					plum bagel.
				</p>
			</div>
			<div className="engagementSectionItem">
				<p className="largeText">Quick delivery</p>
				<div className="engagementIcon">
					<IconSvg iconName="deliveryMap" />
				</div>
				<p className="mediumText alignJustify engagementText">
					Jelly cupcake I love tart lollipop tootsie roll. Sweet roll lollipop croissant
					biscuit ice cream.
				</p>
			</div>
			<div className="engagementSectionItem">
				<p className="largeText">Any problem with delivery ?</p>
				<div className="engagementIcon">
					<IconSvg iconName="parcelReturn" />
				</div>
				<p className="mediumText alignJustify engagementText">
					Danish dessert halvah caramels chupa chups jelly candy. Pudding biscuit gummi.
				</p>
			</div>
			<div className="engagementSectionItem">
				<p className="largeText">Loyalty</p>
				<div className="engagementIcon">
					<IconSvg iconName="loyaltyStar" />
				</div>
				<p className="mediumText alignJustify engagementText">
					Cake tiramisu sesame snaps dragée pie sugar plum. Pastry candy canes dessert
					cheesecake.
				</p>
			</div>
		</section>
	);
};

export default EngagementSection;
