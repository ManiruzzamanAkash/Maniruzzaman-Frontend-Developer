/**
 * External dependencies.
 */
import {__} from '@wordpress/i18n';
import {format} from 'date-fns'

/**
 * Internal dependencies.
 */
import {ICapsuleItem} from "../../interfaces";
import Badge from '../badge';

export default function CapsuleItem({capsule, isShortView}: ICapsuleItem) {
    return (
        <div className="capsule-item">
            <div className="capsule-item-inner">
                {
                    isShortView &&
                    <>
                        <div className={`capsule-status ${capsule.status}`}>
                            <Badge status={capsule.status} />
                        </div>
                        <h3 className="capsule-serial">
                            #{capsule.capsule_serial}
                        </h3>
                    </>
                }

                <div>
                    <span className="capsule-type">{capsule.type}</span>
                </div>
                <p className="capsule-landings">
                    {__('Landed', 'bsf-spacex')} - {capsule.landings} {__('times', 'bsf-spacex')}
                </p>

                {
                    !isShortView &&
                    <>
                        <div className="missions">
                            <h4 className="subheading">{__('Missions', 'bsf-spacex')}</h4>
                            {
                                capsule.missions.map((mission, index) => (
                                    <div className="single-mission" key={index}>
                                        <p><b>{__('Mission name', 'bsf-spacex')}:</b> {mission.name}</p>
                                        <p><b>{__('Flight no', 'bsf-spacex')}:</b> {mission.flight}</p>
                                    </div>
                                ))
                            }
                            {
                                capsule.missions.length == 0 &&
                                <p className="no-mission">{__('No missions found !', 'bsf-spacex')}</p>
                            }
                        </div>
                        <div className="details">
                            <h4 className="subheading">{__('Details', 'bsf-spacex')}</h4>
                            <div>
                                {capsule.details}
                            </div>
                        </div>
                    </>
                }
                <div>
                    {
                        capsule.original_launch !== 'undefined' && capsule.original_launch !== null &&
                        <p title={format(new Date(capsule.original_launch), 'yyyy-LL-dd hh:ii:ss a')}>
                        <span className="original-launch">
                            {__('Launched ', 'bsf-spacex')} - &nbsp;
                            {format(new Date(capsule.original_launch), 'dd MMM yyyy')}
                        </span>
                        </p>
                    }
                </div>
            </div>
        </div>
    )
}
